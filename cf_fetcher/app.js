class CodeforcesUserFetcher {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
        this.setupInputHandling();
        console.log('CodeforcesUserFetcher initialized');
    }

    initializeElements() {
        this.username1Input = document.getElementById('username1');
        this.username2Input = document.getElementById('username2');
        this.fetchBtn = document.getElementById('fetchBtn');
        this.btnText = document.getElementById('btnText');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.errorSection = document.getElementById('errorSection');
        this.errorText = document.getElementById('errorText');
        this.resultsSection = document.getElementById('resultsSection');
        this.user1Card = document.getElementById('user1Card');
        this.user2Card = document.getElementById('user2Card');
    }

    setupInputHandling() {
        // Fix input field behavior to handle text replacement properly
        [this.username1Input, this.username2Input].forEach(input => {
            input.addEventListener('focus', (e) => {
                // Clear any previous error when user starts typing
                this.hideError();
            });

            input.addEventListener('click', (e) => {
                // Select all text when clicking on input (for easy replacement)
                e.target.select();
            });

            input.addEventListener('input', (e) => {
                // Ensure clean input handling
                e.target.value = e.target.value.trim();
            });
        });
    }

    attachEventListeners() {
        this.fetchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Fetch button clicked');
            this.handleFetchUsers();
        });
        
        // Allow Enter key to trigger fetch
        [this.username1Input, this.username2Input].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleFetchUsers();
                }
            });
        });
    }

    async handleFetchUsers() {
        console.log('handleFetchUsers called');
        const username1 = this.username1Input.value.trim();
        const username2 = this.username2Input.value.trim();

        console.log('Usernames:', username1, username2);

        // Validation
        if (!username1 || !username2) {
            this.showError('Please enter both usernames');
            return;
        }

        if (username1 === username2) {
            this.showError('Please enter different usernames');
            return;
        }

        this.setLoadingState(true);
        this.hideError();
        this.hideResults();

        try {
            console.log('Fetching users...');
            const users = await this.fetchUsersFromAPI([username1, username2]);
            console.log('Users fetched:', users);
            this.displayUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            this.showError(error.message);
        } finally {
            this.setLoadingState(false);
        }
    }

    async fetchUsersFromAPI(usernames) {
        const handles = usernames.join(';');
        // Using a CORS proxy to avoid CORS issues
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const apiUrl = `https://codeforces.com/api/user.info?handles=${handles}`;
        const url = proxyUrl + encodeURIComponent(apiUrl);

        console.log('Fetching from URL:', url);

        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('API Response:', data);

            if (data.status !== 'OK') {
                throw new Error(data.comment || 'Failed to fetch user data');
            }

            if (data.result.length !== usernames.length) {
                const foundUsers = data.result.map(u => u.handle);
                const missingUsers = usernames.filter(u => !foundUsers.includes(u));
                throw new Error(`User(s) not found: ${missingUsers.join(', ')}`);
            }

            return data.result;
        } catch (error) {
            console.error('Fetch error:', error);
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Network error. Please check your connection and try again.');
            }
            if (error.message.includes('User(s) not found')) {
                throw error;
            }
            throw new Error('Failed to fetch user data. Please try again.');
        }
    }

    displayUsers(users) {
        console.log('Displaying users:', users);
        this.user1Card.innerHTML = this.createUserCard(users[0]);
        this.user2Card.innerHTML = this.createUserCard(users[1]);
        this.showResults();
    }

    createUserCard(user) {
        const rating = user.rating || 0;
        const maxRating = user.maxRating || rating;
        const rank = user.rank || 'unrated';
        const maxRank = user.maxRank || rank;
        const friendOfCount = user.friendOfCount || 0;
        
        // Get avatar URL - Codeforces uses gravatar or default avatar
        let avatar = user.avatar || user.titlePhoto || 'https://userpic.codeforces.org/no-title.jpg';
        
        // Handle relative URLs from Codeforces
        if (avatar.startsWith('//')) {
            avatar = 'https:' + avatar;
        } else if (avatar.startsWith('/')) {
            avatar = 'https://codeforces.com' + avatar;
        }
        
        const ratingClass = this.getRatingClass(rating);
        const maxRatingClass = this.getRatingClass(maxRating);
        const rankBadgeClass = this.getRankBadgeClass(rank);
        const maxRankBadgeClass = this.getRankBadgeClass(maxRank);

        return `
            <img src="${avatar}" alt="${user.handle}" class="user-avatar" onerror="this.src='https://userpic.codeforces.org/no-title.jpg'">
            <h3 class="user-handle">${user.handle}</h3>
            <div class="user-stats">
                <div class="stat-item">
                    <span class="stat-label">Current Rating</span>
                    <span class="stat-value ${ratingClass}">
                        ${rating}
                        <span class="rank-badge ${rankBadgeClass}">${this.formatRank(rank)}</span>
                    </span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Max Rating</span>
                    <span class="stat-value ${maxRatingClass}">
                        ${maxRating}
                        <span class="rank-badge ${maxRankBadgeClass}">${this.formatRank(maxRank)}</span>
                    </span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Friends</span>
                    <span class="stat-value">${friendOfCount}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Country</span>
                    <span class="stat-value">${user.country || 'Not specified'}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Organization</span>
                    <span class="stat-value">${user.organization || 'Not specified'}</span>
                </div>
                ${user.firstName && user.lastName ? `
                <div class="stat-item">
                    <span class="stat-label">Name</span>
                    <span class="stat-value">${user.firstName} ${user.lastName}</span>
                </div>
                ` : ''}
            </div>
        `;
    }

    getRatingClass(rating) {
        if (rating >= 3000) return 'rating-legendary-grandmaster';
        if (rating >= 2600) return 'rating-international-grandmaster';
        if (rating >= 2400) return 'rating-grandmaster';
        if (rating >= 2300) return 'rating-international-master';
        if (rating >= 2100) return 'rating-master';
        if (rating >= 1900) return 'rating-candidate-master';
        if (rating >= 1600) return 'rating-expert';
        if (rating >= 1400) return 'rating-specialist';
        if (rating >= 1200) return 'rating-pupil';
        return 'rating-newbie';
    }

    getRankBadgeClass(rank) {
        const rankMap = {
            'legendary grandmaster': 'rank-badge--legendary-grandmaster',
            'international grandmaster': 'rank-badge--international-grandmaster',
            'grandmaster': 'rank-badge--grandmaster',
            'international master': 'rank-badge--international-master',
            'master': 'rank-badge--master',
            'candidate master': 'rank-badge--candidate-master',
            'expert': 'rank-badge--expert',
            'specialist': 'rank-badge--specialist',
            'pupil': 'rank-badge--pupil',
            'newbie': 'rank-badge--newbie',
            'unrated': 'rank-badge--newbie'
        };
        return rankMap[rank.toLowerCase()] || 'rank-badge--newbie';
    }

    formatRank(rank) {
        if (!rank || rank === 'unrated') return 'Unrated';
        return rank.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
    }

    setLoadingState(isLoading) {
        console.log('Setting loading state:', isLoading);
        if (isLoading) {
            this.fetchBtn.classList.add('loading');
            this.fetchBtn.disabled = true;
            this.loadingSpinner.classList.remove('hidden');
            this.btnText.style.opacity = '0';
        } else {
            this.fetchBtn.classList.remove('loading');
            this.fetchBtn.disabled = false;
            this.loadingSpinner.classList.add('hidden');
            this.btnText.style.opacity = '1';
        }
    }

    showError(message) {
        console.log('Showing error:', message);
        this.errorText.textContent = message;
        this.errorSection.classList.remove('hidden');
        this.errorSection.classList.add('fade-in');
    }

    hideError() {
        this.errorSection.classList.add('hidden');
        this.errorSection.classList.remove('fade-in');
    }

    showResults() {
        console.log('Showing results');
        this.resultsSection.classList.remove('hidden');
        this.resultsSection.classList.add('fade-in');
    }

    hideResults() {
        this.resultsSection.classList.add('hidden');
        this.resultsSection.classList.remove('fade-in');
    }

    // Method to clear form and reset state
    clearForm() {
        this.username1Input.value = '';
        this.username2Input.value = '';
        this.hideError();
        this.hideResults();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app');
    new CodeforcesUserFetcher();
});

// Prevent form persistence on page reload
window.addEventListener('beforeunload', () => {
    // Clear form data before page unload
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => input.value = '');
});

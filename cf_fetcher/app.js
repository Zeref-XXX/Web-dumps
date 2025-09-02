class CodeforcesFetcher {
    constructor() {
        this.baseURL = 'https://codeforces.com/api';
        this.cache = new Map();
        this.ratingColors = {
            'newbie': '#808080',
            'pupil': '#008000',
            'specialist': '#03A89E',
            'expert': '#0000FF',
            'candidate master': '#AA00AA',
            'master': '#FF8C00',
            'international master': '#FF8C00',
            'grandmaster': '#FF0000',
            'international grandmaster': '#FF0000',
            'legendary grandmaster': '#FF0000'
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        // Ensure results section is visible but content is hidden initially
        document.getElementById('results-section').style.display = 'block';
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Single profile fetch
        document.getElementById('fetch-single').addEventListener('click', () => {
            this.fetchSingleProfile();
        });

        // Compare profiles
        document.getElementById('compare-users').addEventListener('click', () => {
            this.compareProfiles();
        });

        // Enter key support
        document.getElementById('single-username').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.fetchSingleProfile();
        });

        document.getElementById('username-1').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.compareProfiles();
        });

        document.getElementById('username-2').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.compareProfiles();
        });
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${tabName}-tab`);
        });

        // Hide results when switching tabs
        this.hideAllResults();
        this.hideError();
    }

    hideAllResults() {
        const singleResults = document.getElementById('single-results');
        const compareResults = document.getElementById('compare-results');
        if (singleResults) singleResults.classList.add('hidden');
        if (compareResults) compareResults.classList.add('hidden');
    }

    hideError() {
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) errorMessage.classList.add('hidden');
    }

    showError(message) {
        const errorText = document.getElementById('error-text');
        const errorMessage = document.getElementById('error-message');
        if (errorText) errorText.textContent = message;
        if (errorMessage) errorMessage.classList.remove('hidden');
    }

    setLoading(buttonId, isLoading) {
        const button = document.getElementById(buttonId);
        if (!button) return;
        
        const spinner = button.querySelector('.loading-spinner');
        const text = button.querySelector('.btn-text');
        
        if (isLoading) {
            if (spinner) spinner.classList.remove('hidden');
            if (text) text.classList.add('hidden');
            button.disabled = true;
        } else {
            if (spinner) spinner.classList.add('hidden');
            if (text) text.classList.remove('hidden');
            button.disabled = false;
        }
    }

    async fetchUserInfo(handle) {
        const cacheKey = `user_${handle}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const response = await fetch(`${this.baseURL}/user.info?handles=${handle}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.status !== 'OK') {
                throw new Error(data.comment || 'User not found');
            }

            if (!data.result || data.result.length === 0) {
                throw new Error('User not found');
            }

            const userInfo = data.result[0];
            this.cache.set(cacheKey, userInfo);
            return userInfo;
        } catch (error) {
            console.error('Fetch user info error:', error);
            if (error.message.includes('User not found')) {
                throw new Error(`User "${handle}" not found`);
            }
            throw new Error(`Failed to fetch user info: ${error.message}`);
        }
    }

    async fetchUserSubmissions(handle, count = 10) {
        const cacheKey = `submissions_${handle}_${count}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const response = await fetch(`${this.baseURL}/user.status?handle=${handle}&from=1&count=${count}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.status !== 'OK') {
                throw new Error(data.comment || 'Submissions not found');
            }

            const submissions = data.result || [];
            this.cache.set(cacheKey, submissions);
            return submissions;
        } catch (error) {
            console.error('Fetch submissions error:', error);
            // Don't fail the whole request if submissions can't be fetched
            return [];
        }
    }

    async fetchSingleProfile() {
        const handle = document.getElementById('single-username').value.trim();
        if (!handle) {
            this.showError('Please enter a valid handle');
            return;
        }

        this.hideError();
        this.hideAllResults();
        this.setLoading('fetch-single', true);

        try {
            // Fetch user info first
            const userInfo = await this.fetchUserInfo(handle);
            
            // Try to fetch submissions, but don't fail if it doesn't work
            let submissions = [];
            try {
                submissions = await this.fetchUserSubmissions(handle, 10);
            } catch (error) {
                console.warn('Could not fetch submissions:', error);
            }

            // Render the profile
            this.renderProfile(userInfo, 'profile-card-single');
            
            // Render submissions
            const submissionsSection = document.getElementById('submissions-section');
            const submissionsList = document.getElementById('submissions-list');
            if (submissionsSection && submissionsList) {
                this.renderSubmissions(submissions, 'submissions-list');
            }
            
            // Show results
            const singleResults = document.getElementById('single-results');
            if (singleResults) {
                singleResults.classList.remove('hidden');
            }
            
        } catch (error) {
            console.error('Fetch single profile error:', error);
            this.showError(error.message);
        } finally {
            this.setLoading('fetch-single', false);
        }
    }

    async compareProfiles() {
        const handle1 = document.getElementById('username-1').value.trim();
        const handle2 = document.getElementById('username-2').value.trim();

        if (!handle1 || !handle2) {
            this.showError('Please enter both handles for comparison');
            return;
        }

        this.hideError();
        this.hideAllResults();
        this.setLoading('compare-users', true);

        try {
            const [user1, user2] = await Promise.all([
                this.fetchUserInfo(handle1),
                this.fetchUserInfo(handle2)
            ]);

            this.renderProfile(user1, 'profile-card-1');
            this.renderProfile(user2, 'profile-card-2');
            
            const compareResults = document.getElementById('compare-results');
            if (compareResults) {
                compareResults.classList.remove('hidden');
            }
            
        } catch (error) {
            console.error('Compare profiles error:', error);
            this.showError(error.message);
        } finally {
            this.setLoading('compare-users', false);
        }
    }

    generateAvatar(handle, rank) {
        const firstLetter = handle.charAt(0).toUpperCase();
        const rankClass = rank ? rank.replace(/\s+/g, '-').toLowerCase() : 'newbie';
        return `<div class="profile-avatar avatar-${rankClass}">${firstLetter}</div>`;
    }

    getRatingClass(rank) {
        return rank ? rank.replace(/\s+/g, '-').toLowerCase() : 'newbie';
    }

    formatDate(timestamp) {
        if (!timestamp) return 'Unknown';
        return new Date(timestamp * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatLastOnline(timestamp) {
        if (!timestamp) return 'Unknown';
        
        const now = Date.now() / 1000;
        const diff = now - timestamp;
        
        if (diff < 3600) {
            return `${Math.floor(diff / 60)} minutes ago`;
        } else if (diff < 86400) {
            return `${Math.floor(diff / 3600)} hours ago`;
        } else {
            return `${Math.floor(diff / 86400)} days ago`;
        }
    }

    renderProfile(user, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
        const displayName = fullName || user.handle;
        const ratingClass = this.getRatingClass(user.rank);
        const maxRatingClass = this.getRatingClass(user.maxRank);

        container.innerHTML = `
            <div class="profile-header">
                ${this.generateAvatar(user.handle, user.rank)}
                <h2 class="profile-name">${displayName}</h2>
                <div class="profile-handle">@${user.handle}</div>
                <div class="profile-rank rating-${ratingClass}">${user.rank || 'unrated'}</div>
            </div>
            <div class="profile-body">
                <div class="profile-stats">
                    <div class="stat-item">
                        <div class="stat-value rating-${ratingClass}">${user.rating || 0}</div>
                        <div class="stat-label">Current Rating</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value rating-${maxRatingClass}">${user.maxRating || 0}</div>
                        <div class="stat-label">Max Rating</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${user.contribution || 0}</div>
                        <div class="stat-label">Contribution</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${user.friendOfCount || 0}</div>
                        <div class="stat-label">Friends</div>
                    </div>
                </div>
                <div class="profile-details">
                    ${user.country ? `
                    <div class="detail-item">
                        <span class="detail-label">Country</span>
                        <span class="detail-value">${user.country}</span>
                    </div>
                    ` : ''}
                    ${user.city ? `
                    <div class="detail-item">
                        <span class="detail-label">City</span>
                        <span class="detail-value">${user.city}</span>
                    </div>
                    ` : ''}
                    ${user.organization ? `
                    <div class="detail-item">
                        <span class="detail-label">Organization</span>
                        <span class="detail-value">${user.organization}</span>
                    </div>
                    ` : ''}
                    <div class="detail-item">
                        <span class="detail-label">Max Rank</span>
                        <span class="detail-value rating-${maxRatingClass}">${user.maxRank || 'unrated'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Registered</span>
                        <span class="detail-value">${this.formatDate(user.registrationTimeSeconds)}</span>
                    </div>
                    ${user.lastOnlineTimeSeconds ? `
                    <div class="detail-item">
                        <span class="detail-label">Last Online</span>
                        <span class="detail-value">${this.formatLastOnline(user.lastOnlineTimeSeconds)}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    getVerdictClass(verdict) {
        switch (verdict) {
            case 'OK':
                return 'verdict-ok';
            case 'WRONG_ANSWER':
            case 'RUNTIME_ERROR':
            case 'COMPILATION_ERROR':
                return 'verdict-wrong';
            case 'TIME_LIMIT_EXCEEDED':
            case 'MEMORY_LIMIT_EXCEEDED':
                return 'verdict-tle';
            default:
                return 'verdict-other';
        }
    }

    formatVerdict(verdict) {
        switch (verdict) {
            case 'OK':
                return 'Accepted';
            case 'WRONG_ANSWER':
                return 'Wrong Answer';
            case 'TIME_LIMIT_EXCEEDED':
                return 'TLE';
            case 'MEMORY_LIMIT_EXCEEDED':
                return 'MLE';
            case 'RUNTIME_ERROR':
                return 'Runtime Error';
            case 'COMPILATION_ERROR':
                return 'Compilation Error';
            default:
                return verdict ? verdict.replace(/_/g, ' ').toLowerCase() : 'Unknown';
        }
    }

    renderSubmissions(submissions, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        if (!submissions || submissions.length === 0) {
            container.innerHTML = '<div class="text-center">No recent submissions found</div>';
            return;
        }

        container.innerHTML = submissions.slice(0, 10).map(submission => {
            const verdictClass = this.getVerdictClass(submission.verdict);
            const verdictText = this.formatVerdict(submission.verdict);
            
            return `
                <div class="submission-item">
                    <div>
                        <div class="submission-problem">${submission.problem?.name || 'Unknown Problem'}</div>
                        <div class="submission-contest">Contest ${submission.contestId || 'N/A'} - ${submission.problem?.index || 'N/A'}</div>
                    </div>
                    <div class="submission-verdict ${verdictClass}">${verdictText}</div>
                    <div class="submission-language">${submission.programmingLanguage || 'Unknown'}</div>
                </div>
            `;
        }).join('');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new CodeforcesFetcher();
});
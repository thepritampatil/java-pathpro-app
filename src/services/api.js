// API Service Layer - handles all backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

class APIService {
  constructor() {
    this.token = localStorage.getItem('javapath_token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('javapath_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('javapath_token');
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (response.data.token) {
      this.setToken(response.data.token);
    }
    return response;
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (response.data.token) {
      this.setToken(response.data.token);
    }
    return response;
  }

  logout() {
    this.clearToken();
  }

  // User endpoints
  async getCurrentUser() {
    return this.request('/users/me');
  }

  async updateProfile(profileData) {
    return this.request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async getUserStats() {
    return this.request('/users/me/stats');
  }

  // Progress endpoints
  async getProgress() {
    return this.request('/progress');
  }

  async markTopicComplete(topicId, data = {}) {
    return this.request(`/progress/topics/${topicId}/complete`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async markTopicIncomplete(topicId) {
    return this.request(`/progress/topics/${topicId}/incomplete`, {
      method: 'POST',
    });
  }

  // Activity endpoints
  async getActivity(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/activity${queryString ? '?' + queryString : ''}`);
  }

  async logActivity(activityData) {
    return this.request('/activity', {
      method: 'POST',
      body: JSON.stringify(activityData),
    });
  }

  async getStreak() {
    return this.request('/activity/streak');
  }

  // Projects endpoints
  async submitProject(projectId, projectData) {
    return this.request(`/projects/${projectId}/submit`, {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async getUserProjects() {
    return this.request('/users/me/projects');
  }

  // Goals endpoints
  async getGoals(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/goals${queryString ? '?' + queryString : ''}`);
  }

  async createGoal(goalData) {
    return this.request('/goals', {
      method: 'POST',
      body: JSON.stringify(goalData),
    });
  }

  async updateGoalProgress(goalId, progress) {
    return this.request(`/goals/${goalId}/progress`, {
      method: 'PUT',
      body: JSON.stringify(progress),
    });
  }

  async completeGoal(goalId) {
    return this.request(`/goals/${goalId}/complete`, {
      method: 'POST',
    });
  }

  async deleteGoal(goalId) {
    return this.request(`/goals/${goalId}`, {
      method: 'DELETE',
    });
  }

  // Focus sessions endpoints (NEW)
  async logFocusSession(sessionData) {
    return this.request('/focus-sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  async getFocusSessions() {
    return this.request('/focus-sessions');
  }

  // Achievements endpoints (NEW)
  async getUserAchievements() {
    return this.request('/users/me/achievements');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new APIService();

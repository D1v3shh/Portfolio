import { useState, useEffect } from 'react';
import type { PortfolioData } from '../types';
import portfolioData from '../data/portfolio.json';

export const usePortfolio = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay for realistic loading state
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setData(portfolioData as unknown as PortfolioData);
        setError(null);
      } catch (err) {
        setError('Failed to load portfolio data');
        console.error('Error loading portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

  const getFeaturedProjects = () => {
    // Since the current data structure doesn't have featured flag, return first 3 projects
    return data?.projects.slice(0, 3) || [];
  };

  const getProjectsByCategory = (_category: string) => {
    // Since the current data structure doesn't have categories, return all projects
    return data?.projects || [];
  };

  const getSkillsByCategory = (category: string) => {
    // Return skills from the specific category
    if (!data?.skills) return [];
    
    switch (category.toLowerCase()) {
      case 'cloud':
      case 'cloudanddevops':
        return data.skills.cloudAndDevOps || [];
      case 'programming':
      case 'development':
        return data.skills.programmingAndDevelopment || [];
      case 'tools':
        return data.skills.toolsAndPlatforms || [];
      case 'cicd':
        return data.skills.cicdAndWorkflow || [];
      case 'soft':
        return data.skills.softSkills || [];
      default:
        return [];
    }
  };

  const getCurrentExperience = () => {
    // Since the current data structure doesn't have current flag, return all experience
    return data?.experience || [];
  };

  const getFeaturedBlogPosts = () => {
    // No blog data in current structure
    return [];
  };

  const getActiveCertifications = () => {
    // Return all certifications since no expiry date in current structure
    return data?.certifications || [];
  };

  return {
    data,
    loading,
    error,
    // Utility functions
    getFeaturedProjects,
    getProjectsByCategory,
    getSkillsByCategory,
    getCurrentExperience,
    getFeaturedBlogPosts,
    getActiveCertifications,
  };
};
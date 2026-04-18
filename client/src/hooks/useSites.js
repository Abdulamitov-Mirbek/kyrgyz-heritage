import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../utils/api.js';
import toast from 'react-hot-toast';

export const useSites = (params = {}) => {
  return useQuery(
    ['sites', params],
    async () => {
      const { data } = await api.get('/sites', { params });
      return data;
    },
    {
      staleTime: 5 * 60 * 1000,
    }
  );
};

export const useSite = (id) => {
  return useQuery(
    ['site', id],
    async () => {
      const { data } = await api.get(`/sites/${id}`);
      return data;
    },
    {
      enabled: !!id,
    }
  );
};

export const useNearbySites = (lng, lat, distance = 10) => {
  return useQuery(
    ['nearbySites', lng, lat, distance],
    async () => {
      const { data } = await api.get('/sites/nearby', {
        params: { lng, lat, distance },
      });
      return data;
    },
    {
      enabled: !!(lng && lat),
    }
  );
};

export const useSearchSites = (query) => {
  return useQuery(
    ['searchSites', query],
    async () => {
      const { data } = await api.get('/sites/search', { params: { q: query } });
      return data;
    },
    {
      enabled: !!query && query.length > 2,
    }
  );
};

export const useCreateSite = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (siteData) => {
      const { data } = await api.post('/sites', siteData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('sites');
        toast.success('Site created successfully!');
      },
    }
  );
};

export const useUpdateSite = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async ({ id, data: siteData }) => {
      const { data } = await api.put(`/sites/${id}`, siteData);
      return data;
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries('sites');
        queryClient.invalidateQueries(['site', variables.id]);
        toast.success('Site updated successfully!');
      },
    }
  );
};
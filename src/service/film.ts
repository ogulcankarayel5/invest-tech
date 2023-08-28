import ApiService from './client';

const getFilms = async (params: any): Promise<any> => {
  const response = await ApiService.makeRequest<any>({ method: 'GET', params }, '');

  return response;
};

const filmService = {
  getFilms,
};

export default filmService;

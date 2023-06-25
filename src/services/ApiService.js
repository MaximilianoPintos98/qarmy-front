import axios from 'axios'

const ApiService = {
  getCertificates: async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/certificate')
      return response.data
    } catch (error) {
      console.error('Error retrieving certificates: ', error)
      throw error
    }
  },

  getCertificate: async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/certificate/${id}`)
      console.log(response.data)
    } catch (error) {
      console.error('Error retrieving certificates: ', error)
      throw error
    }
  },

  createCertificate: async (data) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/certificate`, data)
      console.log(response)
    } catch (error) {
      console.error('Error post certificates: ', error)
      throw error
    }
  },

  updateCertificate: async (id, data) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/certificate/${id}`, data);
      console.log(response);
    } catch (error) {
      console.error('Error updating certificate: ', error);
      throw error;
    }
  },

  deleteCertificate: async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/certificate/${id}`)
      console.log(response)
    } catch (error) {
      console.error('Error de red', error)
      throw error
    }
  }
}

export default ApiService
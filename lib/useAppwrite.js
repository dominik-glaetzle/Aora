import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();
      setData(response);
      // console.log(response);  // This should now log the data
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when component mounts

  useEffect(() => {
      fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch }
}

export default useAppwrite;
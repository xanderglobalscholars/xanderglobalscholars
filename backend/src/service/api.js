export const fetchStudents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/students`);
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
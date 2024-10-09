const getForecast = (data) => {
    const today = new Date().getDate();
    const tomorrow = new Date().getDate() + 1;
    const dayAfter = new Date().getDate() + 2;

    // Filter for today, tomorrow, and the day after
    const filteredData = data.filter((item) => {
        const itemDate = new Date(item.dt * 1000).getDate();
        return itemDate === today || itemDate === tomorrow || itemDate === dayAfter;
      });

    // Organize and display data
    const groupedData = {
        tomorrow: filteredData.filter(item => new Date(item.dt * 1000).getDay() === new Date().getDay() +1 )[0],
        dayAfter: filteredData.filter(item => new Date(item.dt * 1000).getDay() === new Date().getDay() +2)[0]
      };

    return groupedData;
}

export default getForecast;
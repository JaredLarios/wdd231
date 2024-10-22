const getForecast = (data) => {
    let today = new Date();
    let tomorrow = new Date()
    let dayAfter = new Date();
    
    tomorrow.setDate(today.getDate() + 1);
    dayAfter.setDate(today.getDate() + 2);


    // Filter for today, tomorrow, and the day after
    const filteredData = data.filter((item) => {
        const itemDate = new Date(item.dt_txt).getDate();
        return itemDate === tomorrow.getDate() || itemDate === dayAfter.getDate();
      });

    // Organize and display data
    const groupedData = {
        tomorrow: filteredData.filter(item => new Date(item.dt_txt).getDay() === tomorrow.getDay())[0],
        dayAfter: filteredData.filter(item => new Date(item.dt_txt).getDay() === dayAfter.getDay())[0]
      };

    return groupedData;
}

export default getForecast;
//Fetch marks
const getMarks = url => {
  return async () => {
    try {
      // const results = await fetch(
      //   "https://s3-us-west-2.amazonaws.com/s.cdpn.io/617753/globe-points.json"
      // );
      // data = await results.json();
      const data = [
        {
          id: 1,
          city: "Sydney",
          color: "red",
          coordinates: [-33.8688, 151.2093],
          value: 25
        },
        {
          id: 2,
          city: "Melbourne",
          color: "blue",
          coordinates: [-37.8136, 144.9631],
          value: 25
        },
        {
          id: 3,
          city: "Hobart",
          color: "yellow",
          coordinates: [-42.8821, 147.3272],
          value: 25
        },
        {
          id: 4,
          city: "Shanghai",
          color: "green",
          coordinates: [31.2304, 121.4737],
          value: 25
        }
      ];
      return data;
    } catch (error) {
      return console.error(error);
    }
  };
};

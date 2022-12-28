export const splitStatisticsDataToChart = (dashboardData: any) => {
  const labels = dashboardData.map((element: any) => {
    return element[0];
  });

  const rightQuantity = dashboardData.map((element: any) => {
    return element[1];
  });

  const badQuantity = dashboardData.map((element: any) => {
    return element[2];
  });

  const childChartObject = {
    right: {
      data: rightQuantity,
      color: '#026937',
    },
    bad: {
      data: badQuantity,
      color: '#af1717',
    },
    labels: labels,
  };
  return childChartObject;
};

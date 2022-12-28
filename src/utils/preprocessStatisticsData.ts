export const preProcessStatisticsData = (dataRight: any, dataBad: any) => {
  let dashboardData: any = [];
  dataRight.forEach((rightQuestionResult: any) => {
    let badQuestionResult = dataBad.filter(
      (bad: any) => bad.parameter === rightQuestionResult.parameter
    )[0];
    if (badQuestionResult) {
      dashboardData.push([
        rightQuestionResult.parameter,
        rightQuestionResult.count,
        badQuestionResult.count,
      ]);
    } else {
      dashboardData.push([
        rightQuestionResult.parameter,
        rightQuestionResult.count,
        0,
      ]);
    }
  });

  dataBad.forEach((element: any) => {
    let question = dashboardData.filter(
      (question: any) => question[0] === element.parameter
    )[0];
    if (!question) {
      let rightQuestionResult = dataRight.filter(
        (right: any) => right.parameter === element.parameter
      )[0];

      if (rightQuestionResult) {
        dashboardData.push([
          element.parameter,
          rightQuestionResult.count,
          element.count,
        ]);
      } else {
        dashboardData.push([element.parameter, 0, element.count]);
      }
    }
  });

  return dashboardData.sort((a: any, b: any) => a[0] - b[0]);
};

export const requestDataAndPaginateIt = (
  data: any,
  page: number,
  objectThis: any,
  serviceMethod: any,
  service: any,
  toasterService: any
) => {
  serviceMethod(data, page, service).subscribe(
    (response: any) => {
      objectThis.loading = false;
      if (response.status == 200) {
        objectThis.dataSource = response.data.data;
        objectThis.total = response.data.total;
        if (objectThis.total == 0) {
          toasterService.warning(
            'No se encontraron registros en base de datos.',
            'Advertencia'
          );
        }
      } else {
        toasterService.error(
          'No fue posible obtenerse registros en base de datos.',
          'Error'
        );
      }
    },
    () => {
      objectThis.loading = false;
      toasterService.error(
        'Ocurrió un error al obtenerse los registros en base de datos.',
        'Error'
      );
    }
  );
};

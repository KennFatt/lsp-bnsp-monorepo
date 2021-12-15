const ENDPOINT = "http://localhost:3030/productioncost";

export interface CreateProductionRecordDto {
  kuantitasProduksi: number;
  biayaVariable: number;
  fixedCost: number;
  totalCost?: number;
  marginalCost?: number;
}

export interface ProductionRecordDto
  extends Partial<CreateProductionRecordDto> {
  id: number;
}

/**
 * Call endpoint to create a new record.
 */
export const createProductionRecord = async (
  dto: CreateProductionRecordDto
) => {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  return response;
};

/**
 * Retrieve all the records that are stored in the DB.
 */
export const retrieveProductionRecords = async () => {
  const response = await fetch(ENDPOINT);
  const productionRecords = (await response.json()) as ProductionRecordDto[];

  return productionRecords;
};

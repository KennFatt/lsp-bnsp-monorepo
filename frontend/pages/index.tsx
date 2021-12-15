import type { NextPage } from 'next'
import { useEffect, useState } from 'react';

import { CreateForm } from '../components/CreateForm';
import { ProductionRecordDto } from '../lib/api';
import { retrieveProductionRecords } from '../lib/api';

interface ICalculationOutput {
  marginalCost?: number;
  averageTotalCost?: number;
  averageVariableCost?: number;
  averageFixedCost?: number;
}

const Home: NextPage = () => {
  const [productionRecords, setProductionRecords] = useState<ProductionRecordDto[]>([]);
  const [calculationResult, setCalculationResult] = useState<ICalculationOutput | null>(null);

  const getProductionRecords = async () => {
    const records = await retrieveProductionRecords()

    setProductionRecords(records)
  }

  useEffect(() => {
    getProductionRecords();
  }, [])

  const doCalculation = () => {
    if (!productionRecords) {
      return
    }

    const totalFixedCost = productionRecords[0].fixedCost || 0;
    const totalVariableCost = productionRecords.reduce((accu, value) => {
      return accu + (value.biayaVariable || 0)
    }, 0);
    const q = productionRecords.reduce((accu, value) => {
      return accu + (value.kuantitasProduksi || 0)
    }, 0)

    const totalCost = totalFixedCost + totalVariableCost;

    const atc = totalCost / q;
    const avc = totalVariableCost / q;
    const afc = totalFixedCost / q;

    // will be calculated in Frontend
    // ATC = TC / Q        [proven]
    // AVC = tVC / Q       [proven]
    // AFC = tFC = / Q     [proven]
    setCalculationResult({
      marginalCost: 0,
      averageTotalCost: atc,
      averageVariableCost: avc,
      averageFixedCost: afc
    })
  }

  return (
    <div className='bg-gray-50 w-full max-w-4xl min-h-screen mx-auto text-gray-900'>
      <header className='py-8'>
        <h1 className='text-2xl font-bold'>Perhitungan Biaya Produksi PT ICL Abadi</h1>
      </header>

      {/* Form? */}
      <CreateForm onCreateSuccess={getProductionRecords} />

      {/* List of all the records */}
      <section className='bg-gray-50 p-4 my-8 rounded-md shadow-lg'>
        <h2 className='font-bold'>Masukkan data baru:</h2>

        {/* Action buttons */}
        <div className='flex space-x-4'>
          <button className='hover:bg-gray-400 px-4 py-2 mt-2 font-medium text-gray-900 bg-gray-300 rounded-md' onClick={getProductionRecords}>Perbarui data</button>
          <button className='hover:bg-green-700 px-4 py-2 mt-2 font-medium text-white bg-green-600 rounded-md' onClick={doCalculation}>Lakukan Perhitungan</button>
        </div>

        {/* Hasil perhitungan (program output) */}
        {calculationResult && (
          <div className='my-8'>
            <p><span className='font-bold'>Marginal Cost:</span> {calculationResult.marginalCost}</p>
            <p><span className='font-bold'>Average Total Cost:</span> {calculationResult.averageTotalCost}</p>
            <p><span className='font-bold'>Average Variable Cost:</span> {calculationResult.averageVariableCost}</p>
            <p><span className='font-bold'>Average Fixed Cost:</span> {calculationResult.averageFixedCost}</p>
          </div>
        )}

        <table className="w-full my-8 table-fixed">
          <thead>
            <tr>
              <th>Kuantitas Produksi</th>
              <th>Biaya Variable</th>
              <th>Fixed Cost</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {
              productionRecords.map(({ id, kuantitasProduksi, biayaVariable, fixedCost, totalCost }) => {
                return (
                  <tr key={id} className='text-center'>
                    <td>{kuantitasProduksi}</td>
                    <td>{biayaVariable}</td>
                    <td>{fixedCost}</td>
                    <td>{totalCost}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Home

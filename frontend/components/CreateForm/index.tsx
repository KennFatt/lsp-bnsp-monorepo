import type { FC } from "react";
import type { CreateProductionRecordDto } from "../../lib/api";
import { useState } from "react";
import { createProductionRecord } from "../../lib/api";
import { useForm } from "react-hook-form";

interface ICreateForm {
  onCreateSuccess?: () => void;
}

export const CreateForm: FC<ICreateForm> = ({ onCreateSuccess }) => {
  const { register, reset, handleSubmit } = useForm();
  const [error, setError] = useState<string | null>(null)

  const onSubmit = (data: CreateProductionRecordDto) => {
    if (
      data.fixedCost.toString() === "" ||
      data.kuantitasProduksi.toString() === "" ||
      data.biayaVariable.toString() === ""
    ) {
      setError("Mohon isi form dengan nilai yang benar.")
      return;
    }

    const postRecord = async () => {
      const response = await createProductionRecord({
        fixedCost: +data.fixedCost,
        kuantitasProduksi: +data.kuantitasProduksi,
        biayaVariable: +data.biayaVariable
      })

      if (!response.ok) {
        setError("terjadi kesalahan pada server...")
        return;
      }

      await response.json();
      onCreateSuccess?.call(null)
      setError(null)
      reset()
    }

    postRecord()
  }

  return <section className='bg-gray-50 p-4 my-8 rounded-md shadow-lg'>
    <h2 className='font-bold'>Masukkan data baru:</h2>
    <form className='flex flex-col space-y-4' onSubmit={handleSubmit(onSubmit)}>
      {/* Fixed cost */}
      <label htmlFor='fixed-cost' className='font-medium'>Fixed Cost</label>
      <input type="number" id='fixed-cost' className='focus:ring-2 focus:ring-gray-500 p-2 bg-gray-200 rounded-md outline-none' {...register("fixedCost")}></input>

      {/* Kuantitas produk */}
      <label htmlFor='kuantitas-produksi' className='font-medium'>Kuantitas produksi</label>
      <input type="number" id="kuantitas-produksi" className='focus:ring-2 focus:ring-gray-500 p-2 bg-gray-200 rounded-md outline-none' {...register("kuantitasProduksi")}></input>

      {/* Biaya variable */}
      <label htmlFor='biaya-variable' className='font-medium'>Biaya Variable</label>
      <input type="number" id="biaya-variable" className='focus:ring-2 focus:ring-gray-500 p-2 bg-gray-200 rounded-md outline-none' {...register("biayaVariable")}></input>

      {error && <p className='p-2 text-red-500 bg-red-200 rounded-md'>{error}</p>}

      <button className='hover:bg-green-700 py-2 font-medium text-white bg-green-600 rounded-md'>Tambahkan</button>
    </form>
  </section>
}

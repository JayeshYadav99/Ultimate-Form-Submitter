import React from 'react'
import FormJar from '@/components/form/FormJar'

const page = () => {
  return (
    <div className="max-w-7xl mx-auto mt-10 p-6  border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">Functionally Dysfunctional Form Submitter</h1>
    <FormJar/>
    </div>
  )
}

export default page
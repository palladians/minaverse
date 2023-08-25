import React from 'react'

type Field = {
  label: string
  value?: React.ReactNode
  testId: string
}

interface FieldGridProps {
  fields: Field[]
}

export const FieldGrid = ({ fields }: FieldGridProps) => {
  return (
    <div className="grid border rounded-md">
      {fields.map((field) => (
        <div
          key={field.label}
          className="grid grid-cols-5 items-center border-b"
          data-testid={field.testId}
        >
          <p className="text-right text-sm font-semibold p-2">{field.label}</p>
          <p className="col-span-4 break-all leading-8 border-l p-2">
            {field.value}
          </p>
        </div>
      ))}
    </div>
  )
}

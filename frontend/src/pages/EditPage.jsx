import React from 'react'
import { Diet, DietForm } from '../components'
import { useParams } from 'react-router-dom'

function EditPage() {

    const {dietId} = useParams()
    console.log("slug",dietId)
  return (
<DietForm isEditMode={true} />
  )
}

export default EditPage
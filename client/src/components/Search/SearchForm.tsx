import GenericForm from "../forms/GenericForm"
import { SearchFormFields } from "../forms/formFieldProps"


type SearchFormProps = {
  onSearch: (values: {[key: string] : string | number}) => void
}

export default function SearchForm ({onSearch} : SearchFormProps) {

  const initialValues = {
    searchText: ''
  }
  const searchFields = SearchFormFields
  const title= 'Search: '; 
  const submitText = 'search 🔍'

  return <GenericForm formFields={searchFields} formTitle={title} submitText={submitText} initialValues={initialValues} onFormSubmit={onSearch}/>
}
import GenericForm from '../../MenusAndForms/genericForms/GenericForm';
import { SearchFormFields } from '../../../utils/formFields';

import './SearchForm.css'

type SearchFormProps = {
  onSearch: (values: { [key: string]: string | number }) => void;
};

export default function SearchForm({ onSearch }: SearchFormProps) {
  const initialValues = {
    searchText: '',
  };
  const searchFields = SearchFormFields;
  const submitText = 'search 🔍';

  return (
    <GenericForm
      formName='search-form'
      formFields={searchFields}
      submitText={submitText}
      initialValues={initialValues}
      onFormSubmit={onSearch}
    />
  );
}

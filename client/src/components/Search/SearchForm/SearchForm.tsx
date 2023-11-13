import GenericForm from '../../genericForms/GenericForm';
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
  const title = 'Search: ';
  const submitText = 'search 🔍';

  return (
    <GenericForm
      formName='search-form'
      formFields={searchFields}
      formTitle={title}
      submitText={submitText}
      initialValues={initialValues}
      onFormSubmit={onSearch}
    />
  );
}

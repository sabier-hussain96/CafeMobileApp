import { useDispatch as defaultUseDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useDispatch = () => defaultUseDispatch<AppDispatch>();

export default useDispatch;

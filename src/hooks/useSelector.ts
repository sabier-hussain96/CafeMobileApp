import { TypedUseSelectorHook, useSelector as defaultUseSelector } from 'react-redux';
import { RootState } from  '../../store';

const useAppSelector: TypedUseSelectorHook<RootState> = defaultUseSelector;

export default useAppSelector;

import { useEffect } from 'react';
import getFirstRecipes from '../redux/actions/getFirstRecipes';

function useGetFirstRecipes(dispatch, pathname) {
  useEffect(() => {
    dispatch(getFirstRecipes(pathname));
  }, [pathname]);
}

export default useGetFirstRecipes;

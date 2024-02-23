export const updateUrlParams = (
  name: string,
  search: URLSearchParams,
  e: React.ChangeEvent<HTMLInputElement>,
  setSearch: any
) => {
  if (e.target.value === "") {
    search.delete(name);
    setSearch(search, {
      replace: true,
    });
  } else {
    search.set(name, e.target.value);
    setSearch(search, {
      replace: true,
    });
  }
};











    // if (e.target.value === '') {
    //   search.delete('product');
    //   setSearch(search, {
    //     replace: true,
    //   });
    // } else {
    //   search.set('product', e.target.value);
    //   setSearch(search, {
    //     replace: true,
    //   });
    // }

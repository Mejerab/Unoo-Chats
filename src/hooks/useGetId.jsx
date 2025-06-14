
const useGetId = (id1, id2) => {
    return [id1, id2].sort().join('_');
};

export default useGetId;
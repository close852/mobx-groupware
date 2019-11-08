export function paging(order, sortType, pageSize, page) {
    let orderBy = order ? (sortType ? ('order by ' + escape(order) + ' ' + sortType) : escape(order)) : '';
    return {
        orderBy,
        size: Number(pageSize) || 10,
        startWith: Number((Number(page) || 1) - 1) * (Number(pageSize) || 10)
    }
}

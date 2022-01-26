export default function paginate(allItems, pageSize, currentPage){
  const start = pageSize * (currentPage - 1);
  const end = pageSize * currentPage;
  
  return allItems.slice(start, end);
}

export function startPosition(pageSize, currentPage) {
  return pageSize * (currentPage - 1);
};

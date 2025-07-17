const DisplayDate = () => {
  const date = new Date();
  const formattedDate = date.toLocaleString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'});
  console.log('date is:', date);
  
  return (
      <p className="text-stone-200 font-semibold mb-4">{ formattedDate }</p>
  )
}

export default DisplayDate;
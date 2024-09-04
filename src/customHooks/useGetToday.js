import  { useEffect, useState } from 'react'

const useGetToday = () => {
    const [today, setToday] = useState(null);
   
    useEffect(() => {
        const today1 = new Date();
        const dd = String(today1.getDate()).padStart(2, '0');
        const mm = String(today1.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today1.getFullYear();
        
        const formattedToday = `${dd}/${mm}/${yyyy}`;
        setToday(formattedToday);
    }, []);

  return today;
}

export default useGetToday;
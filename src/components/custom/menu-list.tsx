import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";

interface Menu {
    id: string;
    name: string;
    category: string;
    serving: string;
    price: number;
    cost: number;
    stock: number;
}


function MenuList() {
    const [data, setData] = useState<Menu[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/get-list');
          if(!response.ok) {
            throw new Error('Network response is not ok');
          }
          const data = await response.json();
  
          console.log(data);
          setData(data);
        }  catch (error) {
          console.log(error);
          setError(error);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, [])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;  

  return (
    <>
      {Array.isArray(data) && data.map((menu) => (
        <TableRow id={menu?.id}>
            <TableCell className="font-medium">
            {menu.name}
            </TableCell>
            <TableCell>{menu.category}</TableCell>
            <TableCell>{menu.price}</TableCell>
            <TableCell>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            </TableCell>                
        </TableRow>
      ))}    
    </>
  )
}

export default MenuList
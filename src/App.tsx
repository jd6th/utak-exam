import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { MenuForm } from "./components/custom/menu-form"
import { Toaster } from "./components/ui/toaster"
import { Menu, columns } from "./components/dataTable/columns"
import { DataTable } from "./components/dataTable/data-table"
import { useEffect, useState } from "react"

function App() {
  const [data, setData] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);
  const [menuSelected, setMenuSelected] = useState<any>(undefined);
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('Add Game')

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
    },[])


    useEffect(() => {
      if (menuSelected && (Object.prototype.hasOwnProperty.call(menuSelected, 'id'))){ 
        console.log(menuSelected)
      }
    },[menuSelected, open])

  return (
    <>
      <div className="container mx-auto flex-1 py-10">
        <div className="ml-auto flex items-center gap-2">
           <MenuForm 
            open={open}
            setOpen={setOpen}
            menu={menuSelected}
            dialogTitle={dialogTitle}
           />
        </div>
        <div className="mt-[20px]">
          <Card>
            <CardHeader>
              <CardTitle>Menu List</CardTitle>
            </CardHeader> 
            <CardContent>
              {loading && <p>Loading...</p>}
              {!loading && (
                <DataTable 
                  columns={columns} 
                  data={data}
                  setItemSelected={setMenuSelected}
                  setOpen={setOpen}
                  setDialogTitle={setDialogTitle}
                />
              )}
            </CardContent> 
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>              
          </Card>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default App

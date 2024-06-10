import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MenuForm } from "./components/custom/menu-form"
import MenuList from "./components/custom/menu-list"
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <>
      <div className="container mx-auto flex-1 py-10">
        <div className="ml-auto flex items-center gap-2">
          {/* <Button size="sm" className="h-7 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button> */}
          <MenuForm />
        </div>

        <div className="mt-[20px]">
          <Card>
            <CardHeader>
              <CardTitle>Menu List</CardTitle>
            </CardHeader> 
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>                
                  </TableRow>
                </TableHeader>
                <TableBody>
                    <MenuList />
                </TableBody>
              </Table>
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

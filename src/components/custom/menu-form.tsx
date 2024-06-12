import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"  
import { Input } from "@/components/ui/input"
import { PlusCircle } from "lucide-react"
import { z } from "zod"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import useDataApi from "@/api/postData"

interface Menu  {
  id: string
  name: string
  category: string
  serving: string
  price: string
  cost: string
  stock: string
}

interface MenuDialogProps {
    open: boolean;
    setOpen: (arg0: boolean) => void;
    menu: Menu;
    dialogTitle: string;
}

const formSchema = z.object({
    name: z.string().min(6).max(50),
    category: z.string().min(3).max(50),
    serving: z.string().min(3).max(50),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
    cost: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid cost format"),
    stock: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
  })

export function MenuForm(props: MenuDialogProps) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string>('');
  const { toast } = useToast()
  const {menu} = props

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {saveData} = useDataApi('/api/menu-add'); 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { setValue, reset } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values:::", values)
    return
    const res = await saveData(values);
    setOpen(false);

    if(res?.error) {
        toast({
            title: "Error",
            description: "Something went wrong!!!",
            className: cn(
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
            variant: 'destructive'
        })
    } else {
        toast({
            title: "Menu added",
            description: "Successfully added new menu!",
            className: cn(
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-emerald-400'
                ),
        })
    }
  };


  useEffect(() => {
    setOpen(props.open)
    if(menu) {
        setValue('name', menu.name)
        setValue('category', menu.category)
        setValue('serving', menu.serving)
        setValue('price', menu.price)
        setValue('cost', menu.cost)
        setValue('stock', menu.stock)
    }
    console.log("edit:::", menu)
  },[menu, setValue, props.open]);


  useEffect(() => {
    if (!props.open) {
        reset(
            { 
                name: '',
                category: '',
                serving: '',
                price: '',
                cost: '',
                stock: ''
            }
        ); // Reset the form fields when the dialog is closed
    }
}, [props.open, reset]);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
        <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
             Add Menu
            </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Menu</DialogTitle>
        </DialogHeader>
        <div className="py-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="menu name" 
                                            {...field}
                                            value={props.menu ? props.menu.name : ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({field}) => (
                                    <FormItem >
                                        <FormLabel>Category</FormLabel>
                                        <Select 
                                            onValueChange={(value) => {
                                                setCategory(value)
                                                form.setValue('category', value)
                                            }}
                                            value={category}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="appetizer">Appetizer</SelectItem>
                                                <SelectItem value="salad">Salad</SelectItem>
                                                <SelectItem value="pasta">Pasta</SelectItem>
                                                <SelectItem value="sandwich">Sandwich</SelectItem>
                                                <SelectItem value="dessert">Dessert</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />                            
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="serving"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Size of Serving</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="size" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="small">Small</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="large">Large</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />                            
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input placeholder="0.00" type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="cost"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Cost</FormLabel>
                                        <FormControl>
                                            <Input placeholder="0.00" type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>       

                    <div>            
                    <FormField
                            control={form.control}
                            name="stock"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Amount in stock</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </Form>
        </div>        
      </DialogContent>
    </Dialog>
  )
}

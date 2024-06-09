
<div className="grid grid-cols-4 items-center gap-2">
<Label className="col-span-4">Name</Label>
<Input value="" placeholder="Menu name" className="col-span-4" />
</div>

<div className="grid grid-cols-2 gap-4">
<div className="grid gap-2">
    <Label className="">Category</Label>
    <Select>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            <SelectItem value="sandwich">Sandwich</SelectItem>
            <SelectItem value="dessert">Dessert</SelectItem>
            <SelectItem value="pasta">Pasta</SelectItem>
            <SelectItem value="appetizer">Appetizer</SelectItem>
            <SelectItem value="salad">Salad</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</div>
<div className="grid gap-2">
    <Label className="">Serving size</Label>
    <Select>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a size" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</div>
</div>

<div className="grid grid-cols-2 gap-4">
<div className="grid gap-2">
    <Label className="col-span-4">Price</Label>
    <Input value="" placeholder="Menu price" className="col-span-4" />
</div>
<div className="grid gap-2">
    <Label className="col-span-4">Cost</Label>
    <Input value="" placeholder="Cost" className="col-span-4" />
</div>
</div>

<div className="grid grid-cols-4 items-center gap-2">
<Label htmlFor="name" className="col-span-4">Amount in Stock</Label>
<Input id="name" value="" placeholder="Amount" className="col-span-4" />
</div>
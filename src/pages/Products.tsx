import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

// تعريف نموذج المنتج
interface Product {
  id: string;
  name: string;
  description: string | null;
  barcode: string | null;
  category: string | null;
  manufacturer: string | null;
  price: number;
  cost_price: number;
  stock_quantity: number;
  min_stock_level: number;
  expiry_date: string | null;
}

// مخطط التحقق للنموذج
const productSchema = z.object({
  name: z.string().min(1, { message: "اسم المنتج مطلوب" }),
  description: z.string().nullable(),
  barcode: z.string().nullable(),
  category: z.string().nullable(),
  manufacturer: z.string().nullable(),
  price: z.coerce.number().min(0, { message: "السعر يجب أن يكون رقمًا موجبًا" }),
  cost_price: z.coerce.number().min(0, { message: "سعر التكلفة يجب أن يكون رقمًا موجبًا" }),
  stock_quantity: z.coerce.number().min(0, { message: "الكمية يجب أن تكون رقمًا موجبًا" }),
  min_stock_level: z.coerce.number().min(0, { message: "الحد الأدنى للمخزون يجب أن يكون رقمًا موجبًا" }),
  expiry_date: z.string().nullable(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      barcode: "",
      category: "",
      manufacturer: "",
      price: 0,
      cost_price: 0,
      stock_quantity: 0,
      min_stock_level: 10,
      expiry_date: "",
    },
  });

  // جلب المنتجات عند تحميل الصفحة
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        throw error;
      }

      setProducts(data as Product[]);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء جلب المنتجات",
      });
    } finally {
      setLoading(false);
    }
  }

  // تحميل بيانات المنتج للتعديل
  function handleEdit(product: Product) {
    setSelectedProduct(product);
    form.reset({
      name: product.name,
      description: product.description || "",
      barcode: product.barcode || "",
      category: product.category || "",
      manufacturer: product.manufacturer || "",
      price: product.price,
      cost_price: product.cost_price,
      stock_quantity: product.stock_quantity,
      min_stock_level: product.min_stock_level,
      expiry_date: product.expiry_date || "",
    });
  }

  // إعداد النموذج للإضافة
  function handleAddNew() {
    setSelectedProduct(null);
    form.reset({
      name: "",
      description: "",
      barcode: "",
      category: "",
      manufacturer: "",
      price: 0,
      cost_price: 0,
      stock_quantity: 0,
      min_stock_level: 10,
      expiry_date: "",
    });
  }

  // حفظ بيانات المنتج (إضافة أو تعديل)
  async function onSubmit(values: ProductFormValues) {
    try {
      if (selectedProduct) {
        // تحديث منتج موجود
        const { error } = await supabase
          .from("products")
          .update(values)
          .eq("id", selectedProduct.id);

        if (error) throw error;

        toast({
          title: "تم تحديث المنتج",
          description: "تم تحديث بيانات المنتج بنجاح",
        });
      } else {
        // إضافة منتج جديد - ensure we're passing valid values with required fields
        const productData = {
          name: values.name, // required
          description: values.description || null,
          barcode: values.barcode || null,
          category: values.category || null,
          manufacturer: values.manufacturer || null,
          price: values.price, // required
          cost_price: values.cost_price, // required
          stock_quantity: values.stock_quantity,
          min_stock_level: values.min_stock_level,
          expiry_date: values.expiry_date || null,
        };
        
        const { error } = await supabase
          .from("products")
          .insert([productData]);

        if (error) throw error;

        toast({
          title: "تم إضافة المنتج",
          description: "تم إضافة المنتج بنجاح",
        });
      }

      // إعادة تحميل البيانات
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ المنتج",
      });
    }
  }

  // حذف منتج
  async function handleDelete() {
    if (!selectedProduct) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", selectedProduct.id);

      if (error) throw error;

      toast({
        title: "تم حذف المنتج",
        description: "تم حذف المنتج بنجاح",
      });

      // إغلاق نافذة الحذف وإعادة تحميل البيانات
      setIsDeleteDialogOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء حذف المنتج",
      });
    }
  }

  // تصفية المنتجات حسب مصطلح البحث
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.barcode && product.barcode.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto py-6 space-y-4" dir="rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة المنتجات</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <Plus className="ml-2 h-4 w-4" /> إضافة منتج
            </Button>
          </DialogTrigger>
          <DialogContent dir="rtl" className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{selectedProduct ? "تعديل منتج" : "إضافة منتج جديد"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اسم المنتج *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="barcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الباركود</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الوصف</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الفئة</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="manufacturer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الشركة المصنعة</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>سعر البيع *</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" step="0.01" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cost_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>سعر التكلفة *</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" step="0.01" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="stock_quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الكمية في المخزون *</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="min_stock_level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الحد الأدنى للمخزون *</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="expiry_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تاريخ انتهاء الصلاحية</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">
                    {selectedProduct ? "تحديث المنتج" : "إضافة المنتج"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="relative flex items-center w-full max-w-sm">
          <Search className="absolute right-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="بحث بالاسم أو الباركود..."
            className="pr-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">جاري التحميل...</div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">اسم المنتج</TableHead>
                <TableHead className="text-right">الباركود</TableHead>
                <TableHead className="text-right">الفئة</TableHead>
                <TableHead className="text-right">السعر</TableHead>
                <TableHead className="text-right">الكمية</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    لا توجد منتجات
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.barcode || "-"}</TableCell>
                    <TableCell>{product.category || "-"}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <span className={product.stock_quantity <= product.min_stock_level ? "text-red-500 font-bold" : ""}>
                        {product.stock_quantity}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEdit(product)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent dir="rtl" className="sm:max-w-[550px]">
                            <DialogHeader>
                              <DialogTitle>تعديل منتج</DialogTitle>
                            </DialogHeader>
                            {/* نموذج التعديل - يتم الاستفادة من نفس النموذج السابق */}
                          </DialogContent>
                        </Dialog>

                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* نافذة تأكيد الحذف */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>تأكيد الحذف</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            هل أنت متأكد من رغبتك في حذف المنتج: 
            <span className="font-bold"> {selectedProduct?.name}؟</span>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">إلغاء</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDelete}>
              تأكيد الحذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;

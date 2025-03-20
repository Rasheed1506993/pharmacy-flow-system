
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

// تعريف نموذج العميل
interface Customer {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  created_at: string;
}

// مخطط التحقق للنموذج
const customerSchema = z.object({
  name: z.string().min(1, { message: "اسم العميل مطلوب" }),
  phone: z.string().nullable(),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صالح" }).nullable(),
  address: z.string().nullable(),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  // جلب العملاء عند تحميل الصفحة
  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("customers")
        .select("*");

      if (error) {
        throw error;
      }

      setCustomers(data as Customer[]);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء جلب بيانات العملاء",
      });
    } finally {
      setLoading(false);
    }
  }

  // تحميل بيانات العميل للتعديل
  function handleEdit(customer: Customer) {
    setSelectedCustomer(customer);
    form.reset({
      name: customer.name,
      phone: customer.phone || "",
      email: customer.email || "",
      address: customer.address || "",
    });
  }

  // إعداد النموذج للإضافة
  function handleAddNew() {
    setSelectedCustomer(null);
    form.reset({
      name: "",
      phone: "",
      email: "",
      address: "",
    });
  }

  // حفظ بيانات العميل (إضافة أو تعديل)
  async function onSubmit(values: CustomerFormValues) {
    try {
      if (selectedCustomer) {
        // تحديث عميل موجود
        const { error } = await supabase
          .from("customers")
          .update(values)
          .eq("id", selectedCustomer.id);

        if (error) throw error;

        toast({
          title: "تم تحديث العميل",
          description: "تم تحديث بيانات العميل بنجاح",
        });
      } else {
        // إضافة عميل جديد
        const { error } = await supabase
          .from("customers")
          .insert([values]);

        if (error) throw error;

        toast({
          title: "تم إضافة العميل",
          description: "تم إضافة العميل بنجاح",
        });
      }

      // إعادة تحميل البيانات
      fetchCustomers();
    } catch (error) {
      console.error("Error saving customer:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ بيانات العميل",
      });
    }
  }

  // حذف عميل
  async function handleDelete() {
    if (!selectedCustomer) return;

    try {
      const { error } = await supabase
        .from("customers")
        .delete()
        .eq("id", selectedCustomer.id);

      if (error) throw error;

      toast({
        title: "تم حذف العميل",
        description: "تم حذف العميل بنجاح",
      });

      // إغلاق نافذة الحذف وإعادة تحميل البيانات
      setIsDeleteDialogOpen(false);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء حذف العميل",
      });
    }
  }

  // تصفية العملاء حسب مصطلح البحث
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.phone && customer.phone.includes(searchTerm)) ||
      (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto py-6 space-y-4" dir="rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة العملاء</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <Plus className="ml-2 h-4 w-4" /> إضافة عميل
            </Button>
          </DialogTrigger>
          <DialogContent dir="rtl" className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{selectedCustomer ? "تعديل بيانات العميل" : "إضافة عميل جديد"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم العميل *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهاتف</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>العنوان</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">
                    {selectedCustomer ? "تحديث بيانات العميل" : "إضافة العميل"}
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
            placeholder="بحث بالاسم أو رقم الهاتف..."
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
                <TableHead className="text-right">اسم العميل</TableHead>
                <TableHead className="text-right">رقم الهاتف</TableHead>
                <TableHead className="text-right">البريد الإلكتروني</TableHead>
                <TableHead className="text-right">العنوان</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    لا يوجد عملاء
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.phone || "-"}</TableCell>
                    <TableCell>{customer.email || "-"}</TableCell>
                    <TableCell>{customer.address || "-"}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEdit(customer)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent dir="rtl" className="sm:max-w-[550px]">
                            <DialogHeader>
                              <DialogTitle>تعديل بيانات العميل</DialogTitle>
                            </DialogHeader>
                            {/* نموذج التعديل - يتم الاستفادة من نفس النموذج السابق */}
                          </DialogContent>
                        </Dialog>

                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => {
                            setSelectedCustomer(customer);
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
            هل أنت متأكد من رغبتك في حذف العميل: 
            <span className="font-bold"> {selectedCustomer?.name}؟</span>
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

export default Customers;

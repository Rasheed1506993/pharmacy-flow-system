
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

// تعريف نموذج المورد
interface Supplier {
  id: string;
  name: string;
  contact_person: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  created_at: string;
  pharmacy_id: string | null;
}

// مخطط التحقق للنموذج
const supplierSchema = z.object({
  name: z.string().min(1, { message: "اسم المورد مطلوب" }),
  contact_person: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صالح" }).nullable(),
  address: z.string().nullable(),
});

type SupplierFormValues = z.infer<typeof supplierSchema>;

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userPharmacyId, setUserPharmacyId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: "",
      contact_person: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  // جلب معرف صيدلية المستخدم
  const fetchUserPharmacyId = async () => {
    try {
      const { data: pharmacyData, error: pharmacyError } = await supabase
        .from("pharmacy_profiles")
        .select("id")
        .single();

      if (pharmacyError) {
        console.error("Error fetching pharmacy profile:", pharmacyError);
        return null;
      }

      if (pharmacyData) {
        setUserPharmacyId(pharmacyData.id);
        return pharmacyData.id;
      }
      
      return null;
    } catch (error) {
      console.error("Error in fetchUserPharmacyId:", error);
      return null;
    }
  };

  // جلب الموردين عند تحميل الصفحة
  useEffect(() => {
    const loadData = async () => {
      const pharmacyId = await fetchUserPharmacyId();
      if (pharmacyId) {
        fetchSuppliers();
      } else {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "خطأ",
          description: "تعذر العثور على معلومات الصيدلية. الرجاء تسجيل الدخول مرة أخرى.",
        });
      }
    };
    
    loadData();
  }, []);

  async function fetchSuppliers() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("suppliers")
        .select("*");

      if (error) {
        throw error;
      }

      setSuppliers(data as Supplier[]);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء جلب بيانات الموردين",
      });
    } finally {
      setLoading(false);
    }
  }

  // تحميل بيانات المورد للتعديل
  function handleEdit(supplier: Supplier) {
    setSelectedSupplier(supplier);
    form.reset({
      name: supplier.name,
      contact_person: supplier.contact_person || "",
      phone: supplier.phone || "",
      email: supplier.email || "",
      address: supplier.address || "",
    });
  }

  // إعداد النموذج للإضافة
  function handleAddNew() {
    setSelectedSupplier(null);
    form.reset({
      name: "",
      contact_person: "",
      phone: "",
      email: "",
      address: "",
    });
  }

  // حفظ بيانات المورد (إضافة أو تعديل)
  async function onSubmit(values: SupplierFormValues) {
    try {
      if (!userPharmacyId) {
        const id = await fetchUserPharmacyId();
        if (!id) {
          toast({
            variant: "destructive",
            title: "خطأ",
            description: "تعذر العثور على معلومات الصيدلية. الرجاء تسجيل الدخول مرة أخرى.",
          });
          return;
        }
      }

      if (selectedSupplier) {
        // تحديث مورد موجود
        const { error } = await supabase
          .from("suppliers")
          .update(values)
          .eq("id", selectedSupplier.id);

        if (error) throw error;

        toast({
          title: "تم تحديث المورد",
          description: "تم تحديث بيانات المورد بنجاح",
        });
      } else {
        // إضافة مورد جديد - ensure we're passing valid values with required fields
        const supplierData = {
          name: values.name, // required
          contact_person: values.contact_person || null,
          phone: values.phone || null,
          email: values.email || null,
          address: values.address || null,
          pharmacy_id: userPharmacyId
        };
        
        const { error } = await supabase
          .from("suppliers")
          .insert([supplierData]);

        if (error) throw error;

        toast({
          title: "تم إضافة المورد",
          description: "تم إضافة المورد بنجاح",
        });
      }

      // إعادة تحميل البيانات
      fetchSuppliers();
    } catch (error) {
      console.error("Error saving supplier:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ بيانات المورد",
      });
    }
  }

  // حذف مورد
  async function handleDelete() {
    if (!selectedSupplier) return;

    try {
      const { error } = await supabase
        .from("suppliers")
        .delete()
        .eq("id", selectedSupplier.id);

      if (error) throw error;

      toast({
        title: "تم حذف المورد",
        description: "تم حذف المورد بنجاح",
      });

      // إغلاق نافذة الحذف وإعادة تحميل البيانات
      setIsDeleteDialogOpen(false);
      fetchSuppliers();
    } catch (error) {
      console.error("Error deleting supplier:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء حذف المورد",
      });
    }
  }

  // تصفية الموردين حسب مصطلح البحث
  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (supplier.contact_person && supplier.contact_person.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (supplier.phone && supplier.phone.includes(searchTerm))
  );

  return (
    <div className="container mx-auto py-6 space-y-4" dir="rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة الموردين</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <Plus className="ml-2 h-4 w-4" /> إضافة مورد
            </Button>
          </DialogTrigger>
          <DialogContent dir="rtl" className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{selectedSupplier ? "تعديل بيانات المورد" : "إضافة مورد جديد"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المورد *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contact_person"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>جهة الاتصال</FormLabel>
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
                    {selectedSupplier ? "تحديث بيانات المورد" : "إضافة المورد"}
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
                <TableHead className="text-right">اسم المورد</TableHead>
                <TableHead className="text-right">جهة الاتصال</TableHead>
                <TableHead className="text-right">رقم الهاتف</TableHead>
                <TableHead className="text-right">البريد الإلكتروني</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    لا يوجد موردين
                  </TableCell>
                </TableRow>
              ) : (
                filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell>{supplier.contact_person || "-"}</TableCell>
                    <TableCell>{supplier.phone || "-"}</TableCell>
                    <TableCell>{supplier.email || "-"}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEdit(supplier)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent dir="rtl" className="sm:max-w-[550px]">
                            <DialogHeader>
                              <DialogTitle>تعديل بيانات المورد</DialogTitle>
                            </DialogHeader>
                            {/* نموذج التعديل - يتم الاستفادة من نفس النموذج السابق */}
                          </DialogContent>
                        </Dialog>

                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => {
                            setSelectedSupplier(supplier);
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
            هل أنت متأكد من رغبتك في حذف المورد: 
            <span className="font-bold"> {selectedSupplier?.name}؟</span>
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

export default Suppliers;

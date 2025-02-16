import { IoIosInformationCircleOutline } from "react-icons/io";
import { CurrentUser } from "@/actions/getCurrentUser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { profileFormSchema } from "../hooks/useUpdateProfile";

interface ProfileFormProps {
  currentUser: CurrentUser;
  isLoading: boolean;
  onSubmit: (values: ProfileFormValues) => void;
  onCancel: () => void;
  form: UseFormReturn<ProfileFormValues>;
}

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileForm = ({
  currentUser,
  isLoading,
  onSubmit,
  onCancel,
  form,
}: ProfileFormProps) => {
  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit(value))
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>使用者名稱</FormLabel>
              <FormControl>
                <Input {...field} className="mt-1 block w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full">
          <label className="text-sm font-medium text-gray-700 flex align-center">
            電子郵件
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="text-base ml-1">
                    <IoIosInformationCircleOutline />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>目前不能更改</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>
          <p className="mt-1 text-gray-900">{currentUser.email}</p>
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>自我介紹</FormLabel>
              <FormControl>
                <Input {...field} className="mt-1 block w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "儲存中..." : "儲存變更"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            取消
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;

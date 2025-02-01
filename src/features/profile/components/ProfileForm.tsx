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
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z
    .string({ required_error: "Username 為必填欄位" })
    .regex(
      /^[a-zA-Z0-9_]*$/,
      "只能包含英文、數字及底線，不可包含空白及特殊符號"
    ),
  bio: z.string(),
});

interface ProfileFormProps {
  currentUser: CurrentUser;
  formData: {
    username: string;
    email: string;
    bio: string;
  };
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
}

const ProfileForm = ({
  currentUser,
  formData,
  isLoading,
  onSubmit,
  onChange,
  onCancel,
}: ProfileFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      bio: "",
    },
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center space-y-4">
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          使用者名稱
        </label>
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={onChange}
          className="mt-1 block w-full"
        />
      </div>
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
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          自我介紹
        </label>
        <Input
          type="text"
          name="bio"
          value={formData.bio}
          onChange={onChange}
          className="mt-1 block w-full"
        />
      </div>

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
  );
};

export default ProfileForm;

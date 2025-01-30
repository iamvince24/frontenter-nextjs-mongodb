import * as React from "react";
import Link from "next/link";
import { NavButton } from "@/components/ui/NavButton";
import ArticleForm from "@/components/article/ArticleForm";
import { getCurrentUser } from "@/actions/getCurrentUser";

const Create = async () => {
  const currentUser = await getCurrentUser();
  const authorId = currentUser?.id;

  return (
    <div>
      <ArticleForm authorId={authorId} />
    </div>
  );
};

export default Create;

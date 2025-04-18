import { deleteLink } from "@/actions/delete-link";
import { promiseToast } from "@/lib/lib";
import { LinkType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface PropsType {
  link: LinkType;
  setActive: Dispatch<SetStateAction<boolean>>;
  active: boolean;
}

const DeleteLinkDialog = ({ link, setActive, active }: PropsType) => {
  const router = useRouter();

  async function buttonOnClick() {
    promiseToast(
      new Promise((resolve, reject) => {
        deleteLink(link.backhalf).then((data) => {
          const { message, ok } = data;
          if (ok) {
            resolve(message);
          } else reject(message);
        });
      }),
      {
        successFunction: () => {
          setActive(false);
          router.refresh();
        },
      }
    );
  }

  return (
    <dialog open={active}>
      <div>
        <p>Delete &quot;{link.title}&quot;</p>
        <p>
          Are you sure you want to delete this link? <br />
          This cannot be undone.
        </p>
        <div>
          <button onClick={() => setActive(false)}>Cancel</button>
          <button onClick={buttonOnClick}>Delete</button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteLinkDialog;

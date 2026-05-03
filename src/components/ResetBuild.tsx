import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetBuild } from "../store/slices/buildSlice";

export default function ResetBuild() {
  const dispatch = useAppDispatch();
  const selections = useAppSelector((state) => state.build.selections);

  const isEmpty = Object.keys(selections).length === 0;

  return (
    <Button
      block
      danger
      icon={<DeleteOutlined />}
      onClick={() => dispatch(resetBuild())}
      disabled={isEmpty}
    >
      Reset Card
    </Button>
  );
}
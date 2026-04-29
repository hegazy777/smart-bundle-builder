import { useAppDispatch, useAppSelector } from '../store/hooks';
import { DesktopOutlined, MoonOutlined, RedoOutlined, SunOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Switch, Tooltip, Typography } from 'antd';
import { redo, toggleDarkMode, undo } from '../store/slices/buildSlice';

export default function Header() {

const { Title } = Typography;


 const dispatch = useAppDispatch();
  const historyIndex = useAppSelector((state) => state.build.historyIndex);
  const historyLength = useAppSelector((state) => state.build.history.length);

  const isDarkMode = useAppSelector((state)=> state.build.isDarkMode)

  const Undo = historyIndex > 0;
  const Redo = historyIndex < historyLength - 1;

  

  return (

 <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: 56,
        borderBottom: "1px solid #f0f0f0",
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: isDarkMode ? "#141414" : "#fff",
      }}
    >
     
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <DesktopOutlined style={{ fontSize: 18, color: "#1677ff" }} />
        <Title level={5} style={{ margin: 0 }}>
          Smart Bundle Builder
        </Title>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <Tooltip title="Undo (Ctrl+Z)">
          <Button
            icon={<UndoOutlined />}
            onClick={() => dispatch(undo())}
            disabled={!Undo}
            aria-label="Undo"
          />
        </Tooltip>

        <Tooltip title="Redo (Ctrl+Y)">
          <Button
            icon={<RedoOutlined />}
            onClick={() => dispatch(redo())}
            disabled={!Redo}
            aria-label="Redo"
          />
        </Tooltip>
        {/* Dark Mode Switch */}
        <Tooltip title={isDarkMode ? "Light Mode" : "Dark Mode"}>
          <Switch
            checked={isDarkMode}
            onChange={() => dispatch(toggleDarkMode())}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            aria-label="Toggle Dark Mode"
          />
        </Tooltip>
      </div>
    </header>  
    )
}

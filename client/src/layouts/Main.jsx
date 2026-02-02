import Navbar from "../components/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import TaskForm from "../pages/TaskForm.jsx";
import Todo from "../pages/Todo.jsx";
import Profile from "../pages/Profile.jsx";
import TodoDetail from "../pages/TodoDetail.jsx";
import FlashMessage from "../components/FlashMessage.jsx";
import { FlashProvider, useFlash } from "../context/FlashContext.jsx";
import History from "../pages/History.jsx";

// We create a sub-component to access the hook
const AppContent = () => {
    const { flash, clearMessage } = useFlash();

    return (
        <div className="bg-gray-100 min-h-screen pb-24 md:pb-0">
            <FlashMessage
                message={flash.message}
                type={flash.type}
                onClose={clearMessage}
            />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-task" element={<TaskForm />} />
                <Route path="/edit-task/:id" element={<TaskForm mode="edit" />} />
                <Route path="/todo" element={<Todo />} />
                <Route path="/todo/detail/:id" element={<TodoDetail />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
};

const Main = () => (
    <FlashProvider>
        <AppContent />
    </FlashProvider>
);

export default Main;
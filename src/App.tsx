import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import CreatePost from "./components/CreatePost/CreatePost";
import PostListProvider from "./store/post-store";
import PostList from "./components/PostList/PostList";
import { useState } from "react";

function App() {
  const [selectedTab, setSelectedTab] = useState("Home");
  return (
    <PostListProvider>
      <div className="d-flex">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className=" w-100">
          <Header />
          {selectedTab === "Home" ? <PostList /> : <CreatePost />}
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;

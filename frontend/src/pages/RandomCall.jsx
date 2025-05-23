import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import AgoraRTC from "agora-rtc-sdk-ng";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneOff, Mic, Sparkles } from "lucide-react";

const socket = io("http://localhost:5001");
const APP_ID = "665f7a8ddf874c68a762eeb828338b90";

const RandomCall = () => {
  const [status, setStatus] = useState("idle");
  const [partnerId, setPartnerId] = useState(null);
  const clientRef = useRef(null);
  const localAudioTrackRef = useRef(null);
  const remoteAudioTrackRef = useRef(null);

  const joinChannel = async (channelName, token, uid) => {
    try {
      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      clientRef.current = client;

      await client.join(APP_ID, channelName, token, uid);
      const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      localAudioTrackRef.current = localAudioTrack;
      await client.publish(localAudioTrack);

      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "audio") {
          remoteAudioTrackRef.current = user.audioTrack;
          user.audioTrack.play();
          setStatus("connected");
        }
      });

      client.on("user-left", () => {
        setStatus("partnerLeft");
        leaveChannel();
      });
    } catch (error) {
      console.error("Error joining channel:", error);
      setStatus("error");
    }
  };

  const endCall = () => {
    if (clientRef.current) clientRef.current.leave();
    if (localAudioTrackRef.current) localAudioTrackRef.current.close();
    if (remoteAudioTrackRef.current) remoteAudioTrackRef.current.stop();
    socket.emit("endCall", { partnerId });
    setStatus("idle");
    setPartnerId(null);
  };

  const leaveChannel = () => {
    if (clientRef.current) clientRef.current.leave();
    if (localAudioTrackRef.current) localAudioTrackRef.current.close();
    if (remoteAudioTrackRef.current) remoteAudioTrackRef.current.stop();
    socket.emit("leaveCall");
  };

  const startRandomCall = () => {
    setStatus("searching");
    socket.emit("randomCall");
  };

  useEffect(() => {
    socket.on("callMatched", ({ channelName, token, uid, partnerId }) => {
      setPartnerId(partnerId);
      joinChannel(channelName, token, uid);
    });

    socket.on("callEnded", ({ initiator }) => {
      setStatus(initiator ? "idle" : "partnerLeft");
      leaveChannel();
    });

    return () => {
      leaveChannel();
      socket.off("callMatched");
      socket.off("callEnded");
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white overflow-hidden p-4 sm:p-6">

      {/* ✨ Background Effects */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-150px] left-[-100px] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-pink-300 opacity-20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-indigo-300 opacity-20 rounded-full blur-3xl animate-pulse-slow delay-500" />
        <div className="absolute top-[30%] left-[40%] w-24 h-24 sm:w-32 sm:h-32 bg-white opacity-10 rounded-full blur-2xl animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('/waves.svg')] bg-cover bg-center opacity-5" />
      </div>

      {/* 🌟 Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-400 to-pink-400 mb-8 text-center"
      >
        🌟 SafeSpace Voice Match
      </motion.h1>

      {/* UI States */}
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.button
            key="idle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={startRandomCall}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 sm:px-8 py-3 rounded-full shadow-xl text-white font-semibold transition"
          >
            <Sparkles className="inline-block w-5 h-5 mr-2" />
            Start Random Call
          </motion.button>
        )}

        {status === "searching" && (
          <motion.div
            key="searching"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center space-y-5 text-center"
          >
            <div className="flex space-x-2 animate-bounce-slow">
              <div className="w-3 h-3 bg-pink-300 rounded-full" />
              <div className="w-3 h-3 bg-purple-300 rounded-full" />
              <div className="w-3 h-3 bg-indigo-300 rounded-full" />
            </div>
            <p className="text-lg sm:text-xl font-medium text-purple-100">Finding a connection...</p>
            <button
              onClick={leaveChannel}
              className="px-4 py-2 sm:px-5 bg-red-500 hover:bg-red-600 rounded-full text-white transition"
            >
              Cancel
            </button>
          </motion.div>
        )}

        {status === "connected" && (
          <motion.div
            key="connected"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="backdrop-blur-md bg-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col items-center space-y-6 w-full max-w-sm sm:max-w-md text-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-400/70 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl shadow-lg animate-pulse">
              <Mic />
            </div>
            <p className="text-lg sm:text-xl font-semibold text-green-100">
              You’re now connected! Speak your mind 💬
            </p>
            <button
              onClick={endCall}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white shadow-md"
            >
              <PhoneOff className="w-5 h-5" />
              End Call
            </button>
          </motion.div>
        )}

        {status === "partnerLeft" && (
          <motion.div
            key="left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-5"
          >
            <p className="text-red-300 font-semibold text-lg">
              Your partner left the chat 💔
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setPartnerId(null);
              }}
              className="bg-gradient-to-r from-pink-500 to-indigo-500 px-6 py-2 rounded-full text-white font-medium shadow-md"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RandomCall;

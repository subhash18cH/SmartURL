const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg  shadow-md transition-shadow">
    <div className="flex gap-5 items-center">
      <div className="">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeatureCard
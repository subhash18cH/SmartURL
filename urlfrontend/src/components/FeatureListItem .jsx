const FeatureListItem = ({ icon, title, description }) => (
  <li className="flex items-start space-x-3">
    <div className="flex-shrink-0 mt-1">{icon}</div>
    <div>
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </li>
);
export default FeatureListItem
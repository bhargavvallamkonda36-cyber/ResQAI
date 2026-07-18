function FeatureCard({ feature }) {
  return (
    <div className="shadow-lg rounded-xl p-6 bg-white">
      <h2 className="text-xl font-bold">
        {feature.title}
      </h2>

      <p className="mt-3 text-gray-600">
        {feature.description}
      </p>
    </div>
  );
}

export default FeatureCard;
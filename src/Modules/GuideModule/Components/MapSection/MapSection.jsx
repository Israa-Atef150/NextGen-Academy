import React from 'react';

export default function MapSection() {
    return (
        <div className="map" style={{ width: "80%", margin: "auto", borderRadius: "20px", overflow: "hidden", marginBottom: "50px" }}>
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.378079247894!2d31.299577945867338!3d30.05948205503215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2z2KfZhNmC2KfZh9ix2KnYjCDZhdit2KfZgdi42Kkg2KfZhNmC2KfZh9ix2KnigKw!5e0!3m2!1sar!2seg!4v1741380513097!5m2!1sar!2seg"
                width="100%"
                height="450"
                style={{ border: "0" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
}
